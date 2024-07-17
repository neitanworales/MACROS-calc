<?php

/**
 * Summary of SeccionesDao
 */
class MacrosDao{
    private $bd;
    static $_instance;

    private function __construct(){
        require '../db/Db.class.php';
        $this->bd=Db::getInstance(1);
    }

    public static function getInstance(){
        if (!(self::$_instance instanceof self)){
            self::$_instance=new self();
        }
        return self::$_instance;
    }

    /**
     * Summary of getSecciones
     * @return array<array>
     */
    public function getFood(){
        $que = "SELECT * FROM FOOD";
        return $this->bd->ObtenerConsulta($que);
    }

    public function getFoodById($id){
        $que = "SELECT * FROM FOOD WHERE id=$id";
        return $this->bd->ObtenerConsulta($que);
    }

    public function searchFood($text){
        $que = "SELECT * FROM FOOD WHERE nombre LIKE '%$text%'";
        return $this->bd->ObtenerConsulta($que);
    }

    public function insertFood($id){
        $que = "SELECT * FROM FOOD WHERE id=$id";
        return $this->bd->ObtenerConsulta($que);
    }

    public function updateFood($id){
        $que = "SELECT * FROM FOOD WHERE id=$id";
        return $this->bd->ObtenerConsulta($que);
    }

    public function updateStatusFood($id){
        $que = "SELECT * FROM FOOD WHERE id=$id";
        return $this->bd->ObtenerConsulta($que);
    }
}