<?php

namespace App\Board\Models;
use mysqli;

class Database  {

   private static $connection;
   
   public function __construct($serverName, $username, $password, $db){ 
      Database::$connection = new mysqli($serverName, $username, $password, $db);
      if (!Database::$connection) 
         die("Connection failed: " . Database::$connection -> connect_error);
   }

   public function __destruct(){ 
      Database::$connection -> close();
   } 

   public static function selectOne($columnSelection = false, $tableName, $conditions = false, $orderBy = false){
      $response = Database::select($columnSelection, $tableName, $conditions, $orderBy);
      return $response ? $response[0] : array();
   }
   public static function select($columnSelection = false, $tableName, $conditions = false, $orderBy = false){

      $results = array();
      $columnSelection = is_array($columnSelection) ? implode("," , $columnSelection) : (empty($columnSelection) ? '*' : $columnSelection);
      $conditionsStatement = array();
      if(is_array($conditions)){
         foreach ($conditions as $key => $value) {
            $conditionsStatement[] = "{$key} = '{$value}'";
         }
      }
      $conditions = empty($conditionsStatement) ? '' : "WHERE " . implode(" AND ", $conditionsStatement);
      $orderBy = $orderBy ? "ORDER BY {$orderBy}" : '';
   
      $query = "SELECT {$columnSelection} FROM `{$tableName}` {$conditions} {$orderBy}";
      $stmt = Database::$connection -> prepare($query);
   
      if($stmt){
         
         $stmt->execute();
         $stmt->store_result();
   
         $meta = $stmt->result_metadata();
         while($field = $meta->fetch_field())
            $variables[] = &$data[$field->name];
   
         call_user_func_array(array($stmt, 'bind_result'), $variables);
         
         $i=0;
         while($stmt->fetch())
         {
            $results[$i] = array();
            foreach($data as $k=>$v)
             $results[$i][$k] = $v;
            $i++;
            
         }
      }
   
      return $results;   
   }
   
   public static function insert($tableName, $insertData){
      
      $insertID = false;
      if(is_array($insertData)){
        foreach ($insertData as $key => $value) {
          $insertData[$key] = Database::$connection -> real_escape_string($value);
        }
         $stmt = Database::$connection -> prepare("INSERT INTO `{$tableName}` (" . implode("," , array_keys($insertData)) . ") VALUES ('" .  implode("','" , $insertData) . "')");
         if($stmt->execute())
            $insertID = $stmt->insert_id;
      }
      return $insertID;
   }
   
   public static function delete($tableName, $conditions) {
      
     $conditionsStatement = array();
     if(is_array($conditions)){
        foreach ($conditions as $key => $value) {
           $conditionsStatement[] = "{$key} = '{$value}'";
        }
     }
     $conditions = empty($conditionsStatement) ? '' : "WHERE " . implode(" AND ", $conditionsStatement);
     
     $stmt = Database::$connection -> prepare("DELETE FROM `{$tableName}` {$conditions}");
     if($stmt->execute())
        return true;
      else
        return false;
   }
   
   public static function update($tableName, $updateData, $conditions) {
      
      $updated = false;
      if(is_array($updateData)){
         $updateDataStatement = array();
         if(is_array($updateData)){
            foreach ($updateData as $key => $value) {
               $updateDataStatement[] = "{$key} = '" . Database::$connection -> real_escape_string($value) . "'";
            }
         }
         $updateData = empty($updateDataStatement) ? '' : "SET " . implode(", ", $updateDataStatement);
         
         $conditionsStatement = array();
         if(is_array($conditions)){
            foreach ($conditions as $key => $value) {
               $conditionsStatement[] = "{$key} = '{$value}'";
            }
         }
         $conditions = empty($conditionsStatement) ? '' : "WHERE " . implode(" AND ", $conditionsStatement);
      
         $stmt = Database::$connection -> prepare("UPDATE `{$tableName}` {$updateData} {$conditions}");
   
         if($stmt->execute())
            $updated = true;
      }
   
      return $updated;
   }
}
