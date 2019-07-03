<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$route['api/news']['GET'] = 'api_news/get_all';
$route['api/news/datatables']['GET'] = 'api_news/get_datatable';
$route['api/news/(:num)']['GET'] = 'api_news/get/$1';
$route['api/news/(:num)']['POST'] = 'api_news/update/$1';
$route['api/news/(:num)']['DELETE'] = 'api_news/delete/$1';
$route['api/news/i']['POST'] = 'api_news/add';

$route['default_controller'] = 'page';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
