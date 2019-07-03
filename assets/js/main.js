const baseUrl = 'http://localhost/cruddatatables_ci/'
let tableNews = null;
$(document).ready(function () {
    tableNews = $('.tableNews').DataTable({
        "processing": true,
        "serverSide": true,
        "ordering": true, // Set true agar bisa di sorting
        "order": [[ 0, 'asc' ]], // Default sortingnya berdasarkan kolom / field ke 0 (paling pertama)
        "ajax":
        {
            "url": baseUrl+"api/news/datatables", // URL file untuk proses select datanya
            "type": "GET"
        },
        "deferRender": true,
        "aLengthMenu": [[5, 10, 50],[ 5, 10, 50]], // Combobox Limit
    });
});