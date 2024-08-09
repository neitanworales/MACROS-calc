<?php

/**
 * Summary of SeccionesDao
 */
class MacrosDao
{
    private $bd;
    static $_instance;

    private function __construct()
    {
        require '../db/Db.class.php';
        $this->bd = Db::getInstance(1);
    }

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    /**
     * Summary of getSecciones
     * @return array<array>
     */
    public function getFood()
    {
        $que = "SELECT * FROM FOOD ORDER BY nombre";
        return $this->bd->ObtenerConsulta($que);
    }

    public function getFoodById($id)
    {
        $que = "SELECT * FROM FOOD WHERE id=$id ORDER BY nombre";
        return $this->bd->ObtenerConsulta($que);
    }

    public function searchFood($text)
    {
        $que = "SELECT * FROM FOOD WHERE nombre LIKE '%$text%' OR marca LIKE '%$text%' ORDER BY nombre";
        return $this->bd->ObtenerConsulta($que);
    }

    public function insertFood($nombre, $cantidad, $unidad, $grasa, $carbohidrato, $proteina, $marca)
    {
        $que = "INSERT INTO FOOD(id, nombre, cantidad, unidad, grasa, carbohidrato, proteina, marca, fecha, activo) 
        VALUES (NULL, '$nombre', '$cantidad', '$unidad', '$grasa', '$carbohidrato', '$proteina', '$marca', CURRENT_TIMESTAMP, '1');";
        return $this->bd->ejecutar($que);
    }

    public function updateFood($id)
    {
        $que = "SELECT * FROM FOOD WHERE id=$id";
        return $this->bd->ObtenerConsulta($que);
    }

    public function updateStatusFood($id)
    {
        $que = "SELECT * FROM FOOD WHERE id=$id";
        return $this->bd->ObtenerConsulta($que);
    }
}