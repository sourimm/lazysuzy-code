<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBoardLikesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('board_likes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('user_id')->unsigned();
            $table->integer('board_id')->unsigned();
            $table->timestamps();
            $table->unique(array('board_id', 'user_id'));

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            //$table->foreign('board_id')->references('board_id')->on('board')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('board_likes');
    }
}
