const baseUrl = 'http://localhost/cruddatatables_ci/'
//  == default variable
let tableNews = null;
let btnAdd = null;
let btnUpdate = null;
let item = null;
let msg = null;
let id = null;
//  == END default variable
$(document).ready(function () {
    // == Datatables
        tableNews = $('.tableNews').DataTable({
            "processing": true,
            "serverSide": true,
            "ordering": true,
            "scrollX": true,
            "order": [[ 0, 'desc' ]], 
            "ajax":
            {
                "url": baseUrl+"api/news/datatables", // URL file untuk proses select datanya
                "type": "POST"
            },
            "columns": [
                { "data" : "id" },
                { "data" : "title" },
                { "data" : "slug" },
                { "data" : "text" },
                { 
                    "data"  : "id",
                    "orderable" : false,
                    "render"     : function(data){
                         return '<button class="btn btn-info btn-xs btn-sm btnModalUpdate" id="'+data+'">Update</button> \n\
                                <button class="btn btn-warning btn-xs btn-sm btnDelete" id="'+data+'">Delete</button>';
                    }
                 }
            ],
            "aLengthMenu": [[5, 10, 50],[ 5, 10, 50]], // Combobox Limit
        });
    // == End Datatables

    // == Remove value in form
        function removeValue(){
            $('[type="text"]').val('')
            $('textarea').val('')
        }
    // == END Remove value in form

    // == .btnModalAdd .btnModalUpdate .btnAdd .btnUpdate
    btnAdd = $('.btnAdd');
    btnUpdate = $('.btnUpdate');

    // == Modal add
        $('body').on('click', '.btnModalAdd', function(event) {
            event.preventDefault();
            /* Act on the event */
            removeValue();
            btnAdd.show();
            btnUpdate.hide();
        });
    // == END Modal add

    // == add data
        $('body').on('click', '.btnAdd', function(event) {
            event.preventDefault();
            /* Act on the event */
            let url      = baseUrl+'api/news/i'
            let type     = 'POST'
            item         = $('.form-news').serialize();
            let callback = {
                200: function(response){
                    // console.log('success');
                     $('#exampleModal').modal('hide');
                    _success(response.message);
                    tableNews.ajax.reload();
                },
                203: function(response){
                    // console.log(response.message)
                    _error(response.message)
                }
            }
            getData(url, type, item, callback)
        });
    //  END add data

    //  ==  modal update
        $('body').on('click', '.btnModalUpdate', function(event) {
            event.preventDefault();
            /* Act on the event */
            removeValue();
            $('#exampleModal').modal('show');
            btnUpdate.show();
            btnAdd.hide();
            id           = $(this).attr('id');
            let url      = baseUrl+'api/news/'+id
            let type     = 'GET'
            let callback = {
                200: function(response){
                    $('[name="title"]').val(response.title)
                    $('[name="text"]').val(response.text)
                },
                203: function(response){
                    $('#exampleModal').modal('hide');
                    _error(response.message)
                }
            }
            getData(url, type, item, callback)

            // == Update data
                $('body').on('click', '.btnUpdate', function(event) {
                    event.preventDefault();
                    /* Act on the event */
                    let url      = baseUrl+'api/news/'+id
                    item         = $('.form-news').serialize();
                    let type     = 'POST'
                    let callback = {
                        200: function(response){
                            $('#exampleModal').modal('hide');
                            _success(response.message)
                            tableNews.ajax.reload();
                        },
                        203: function(response){
                            _error(response.message)
                        }
                    }
                    getData(url, type, item, callback)
                });
            // == END Update data

        });
    // == END modal update

    // == Delete data
        $('body').on('click', '.btnDelete', function(event) {
            event.preventDefault();
            /* Act on the event */
            id           = $(this).attr('id')
            let url      = baseUrl+'api/news/'+id
            let type     = "DELETE"
            let callback = {
                200: function(response){
                    _success(response.message);
                    tableNews.ajax.reload();
                },
                203: function(response){
                    _error(response.message)
                }
            }
            getData(url, type, item, callback)
        });
    // == END Delete data
});

// == Message when insert update and delete
    function getData(url, type , data ,callback){
        $.ajax({
            url: url,
            type: type,
            data: data,
            dataType: 'json',
            statusCode: callback
        })
        .fail(function() {
            console.log("error");
        })
    }
    function _error(message){
        msg  = '<div class="alert alert-warning alert-dismissible show" role="alert">';
        msg += '<strong>Error!</strong>'+message;
        msg += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
        msg += '<span aria-hidden="true">&times;</span>';
        msg += '</button>';
        msg += '</div>';
        $('.error').html(msg);
    }
    function _success(message){
        msg  = '<div class="alert alert-success alert-dismissible show" role="alert">';
        msg += '<strong>Success! </strong>'+message;
        msg += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
        msg += '<span aria-hidden="true">&times;</span>';
        msg += '</button>';
        msg += '</div>';
        $('.success').html(msg);
    }
// == END Message when insert update and delete