
class Resource {
    constructor(){
        this.BaseUrl = "http://localhost/cruddatatables_ci/"
    }
    getAll(){
        return $.ajax({
            url: this.BaseUrl+'api/news',
            type: 'GET',
            dataType: 'json',
        })
    }
    get(id){
        return $.ajax({
            url: this.BaseUrl + 'api/news/' + id,
            type: 'GET',
            dataType: 'json',
        })
    }
    add(item){
        return $.ajax({
            url: this.BaseUrl + 'api/news/i',
            type: 'POST',
            dataType: 'json',
            data: item,
        })
    }
    update(item, id){
        return $.ajax({
            url: this.BaseUrl + 'api/news/' + id,
            type: 'POST',
            dataType: 'json',
            data: item,
        })   
    }
    delete(id){
        return $.ajax({
            url: this.BaseUrl + 'api/news/' + id,
            type: 'DELETE',
            dataType: 'json',
        })
    }
}

const baseUrl = 'http://localhost/cruddatatables_ci/'
//  == default variable
let tableNews = null;
let btnAdd = null;
let btnUpdate = null;
let item = null;
let msg = null;
let id = null;

// == Remove value in form
    function removeValue(){
        $('[type="text"]').val('')
        $('textarea').val('')
    }
// == END Remove value in form

//  == END default variable
$(document).ready(function () {

    let resource = new Resource(),
        dataset = [],
        showData;

    resource.getAll().done(function(response){
        // console.log(response)
        dataset.push(...response)
        showData = $('.tableNews').DataTable({
            data: dataset,
            "order": [[ 0, 'desc' ]], 
            "columns": [
                { title: "ID" },
                { title: "Title" },
                { title: "Slug", },
                { title: "Text", },
                { title: "Option", width: "75px" },
            ],
            "columnDefs": [
                { 
                    "targets": 0,
                    "data" : "id"
                },
                { 
                    "targets": 1,
                    "data" : "title" 
                },
                { 
                    "targets": 2,
                    "data" : "slug" 
                },
                { 
                    "targets": 3,
                    "data" : "text" 
                },
                { 
                    "targets": 4,
                    "data"  : "id",
                    "orderable" : false,
                    "render"     : function(data){
                         return '<button class="btn btn-info btn-xs btn-sm btnModalUpdate" id="'+data+'">Update</button> \n\
                                <button class="btn btn-warning btn-xs btn-sm btnDelete" id="'+data+'">Delete</button>';
                    }
                 }
            ],
            "aLengthMenu": [[5, 10, 50],[ 5, 10, 50]], // Combobox Limit
        })
    })

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
            item = $('.form-news').serialize();
            resource.add(item).done(function(response){
                // console.log(response)
                resource.get(response.id).done(function(res){
                    // console.log(res.id)
                    showData.row.add({
                        "id" : res.id,
                        "title" : res.title,
                        "slug" : res.slug,
                        "text" : res.text,
                    }).draw()
                })
                
                dataset.push(response)
                // console.log(dataset)
                $('#exampleModal').modal('hide');
                _success(response.message)
            })
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

            idRow = $(this).parent().parent()
            id = $(this).attr('id');
            resource.get(id).done(function(response){
                $('[name="title"]').val(response.title)
                $('[name="text"]').val(response.text)
            })

            // == Update data
                $('body').on('click', '.btnUpdate', function(event) {
                    event.preventDefault();
                    /* Act on the event */
                    item = $('.form-news').serialize();
                    resource.update(item, id).done(function(response){
                        _success(response.message)
                        $('#exampleModal').modal('hide');
                        resource.get(id).done(function(res){
                            showData.row(idRow).data({
                                "id" : res.id,
                                "title" : res.title,
                                "slug" : res.slug,
                                "text" : res.text,
                            }).draw()
                        })

                    })
                });
            // == END Update data

        });
    // == END modal update

    // == Delete data
        $('body').on('click', '.btnDelete', function(event) {
            event.preventDefault();
            /* Act on the event */
            idRow = $(this).parent().parent()
            id = $(this).attr('id')
            resource.delete(id).done(function(response){
                showData.row(idRow).remove().draw();
                _success(response.message)
            })
        });
    // == END Delete data
});

// == Message when insert update and delete

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