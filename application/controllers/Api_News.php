<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Api_News extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        //Load Dependencies
        $this->load->model('news_model');
        header('Acces-Control-Allow-Origin: http://localhost/cruddatatables_ci/page');
		header('Acces-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
		header('Acces-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
        
    }

    // List all your items
    public function get_all()
    {
        return $this->response($this->news_model->get());
    }

    //a List your item
    public function get($id)
    {
        if (!$this->check_id($id)) {
            return $this->response([
                'success'   => false,
                'message'   => 'id undefined'
            ], 203);
        }
        return $this->response($this->news_model->get('id', $id));
    }

    public function get_datatable()
    {
        ini_set('display_errors','off');
        $fetch_data = $this->news_model->make_datatable();
        $data = [];
        foreach ($fetch_data as $row) {
            $sub_data = [];
            $sub_data['id'] = $row->id;
            $sub_data['title'] = $row->title;
            $sub_data['slug'] = $row->slug;
            $sub_data['text'] = $row->text;
            $data[] = $sub_data;
        }
        $output = [
			"draw"  => intval($_POST["draw"]),
            "recordsTotal"  => $this->news_model->records(),
            "recordsFiltered" => $this->news_model->filtered(),
            "data" => $data
        ];
        return $this->response($output);
    }

    // Add a new item
    public function add()
    {
        $this->form_validation->set_rules('title', 'title', 'required|min_length[5]');
        $this->form_validation->set_rules('text', 'text', 'required|min_length[5]');
        
        if ($this->form_validation->run() == FALSE) {
            return $this->response([
                'success'   => false,
                'message'   => validation_errors()
            ], 203);
        } 

        return $this->response($this->news_model->insert());
    }

    //Update one item
    public function update( $id )
    {
        $this->form_validation->set_rules('title', 'title', 'required|min_length[5]');
        $this->form_validation->set_rules('text', 'text', 'required|min_length[5]');
        
        if ($this->form_validation->run() == FALSE) {
            return $this->response([
                'success'   => false,
                'message'   => validation_errors()
            ], 203);
        }

        if (!$this->check_id($id)) {
            return $this->response([
                'success'   => false,
                'message'   => 'id undefined'
            ], 203);
        }
        
        return $this->response($this->news_model->update($id));
    }

    //Delete one item
    public function delete( $id )
    {
        if (!$this->check_id($id)) {
            return $this->response([
                'success'   => false,
                'message'   => 'id undefined'
            ], 203);
        }
        return $this->response($this->news_model->delete($id));
    
    }
    private function response($data, $status = 200)
    {
        $this->output
			 ->set_status_header($status)
			 ->set_content_type('application/json','utf-8')
			 ->set_output(json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES ))
			 ->_display();
		exit;
    }

    private function check_id($id)
    {
        if (empty($this->news_model->get('id', $id))){
            return false;
        }
        return true;
    }


}

/* End of file Controllername.php */

