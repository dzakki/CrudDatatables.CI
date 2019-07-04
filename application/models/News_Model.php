<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class News_Model extends CI_Model {

    private $table          = 'news',
            $_id            = 'id',
            $select         = 'id, title, slug, text',
            $order_column   = array('id', 'title', 'slug', 'text');
    
    public function __construct()
    {
        parent::__construct();
        //Do your magic here
    }
    
    public function get( $key = null, $value = null)
    {
        if(!empty($key) && !empty($value)){
            $this->db->where($key, $value);
            $query = $this->db->get($this->table);
            return $query->row();
        }

        $query = $this->db->get($this->table);
        return $query->result();
        
    }

    public function make_query()
    {
        $this->db->select( $this->select );
        if (isset($this->input->post('search')["value"])) {
            $this->db->like("title", $this->input->post('search')["value"]);
            $this->db->or_like("slug", $this->input->post('search')["value"]);
            $this->db->or_like("text", $this->input->post('search')["value"]);
        }
        if (isset($_POST['order'])) {
            $this->db->order_by($this->order_column[$_POST['order']['0']['column']], $_POST['order']['0']['dir']);
        }else{
            $this->db->order_by($this->_id, 'DESC');
        }
    }

    public function make_datatable()
    {
        $this->make_query();
        if ($_POST['length'] != -1) {
            $this->db->limit($_POST['length'], $_POST['start']);
        }
        $query = $this->db->get($this->table);
        return $query->result();
    }

    public function records()
    {
        $this->db->select( $this->select );
        $this->db->from($this->table);
        return $this->db->count_all_results();
    }
    public function filtered()
    {
        $this->make_query();
        $query = $this->db->get($this->table);
        return $query->num_rows();
    }

    public function insert()
    {
        # code...
        $this->load->helper('url');
        $slug = url_title($this->input->post('title'), 'dash', TRUE);
        $data = [
            'title' => $this->input->post('title'),
            'slug'  => $slug,
            'text'  => $this->input->post('text')
        ];
        if ($this->db->insert($this->table, $data)) {
            return [
                'id'        => $this->db->insert_id(),
                'success'   => true,
                'message'   => 'add data success'
            ];
        }
        
    }
    public function update($id)
    {
        # code
        $this->load->helper('url');
        $slug = url_title($this->input->post('title'), 'dash', TRUE);
        $data = [
            'title' => $this->input->post('title'),
            'slug'  => $slug,
            'text'  => $this->input->post('text')
        ];
        if ($this->db->where($this->_id, $id)->update($this->table, $data)) {
            # code...
            return [
                'id'        => $id,
                'success'   => true,
                'message'   => 'update data success'
            ];
        }
        
    }
    public function delete($id)
    {
        # code...
        if ($this->db->where($this->_id, $id)->delete($this->table)) {
            return [
                'id'        => $id,
                'success'   => true,
                'message'   => 'delete data success'
            ];
        }
    }

}
