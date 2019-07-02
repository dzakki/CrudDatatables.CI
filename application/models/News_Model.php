<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class News_Model extends CI_Model {

    private $table = 'news',
            $_id   = 'id',
            $select= 'id, title, slug, text';
    
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
    public function insert()
    {
        # code...
        $data = [
            'title' => $this->input->post('title'),
            'slug'  => $this->input->post('slug'),
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
        $data = [
            'title' => $this->input->post('title'),
            'slug'  => $this->input->post('slug'),
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
