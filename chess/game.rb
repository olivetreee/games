require_relative 'board'
require_relative 'cursor'
require_relative 'display'
require 'byebug'

class Game
  def initialize (player_1, player_2)
    @board = Board.new
    @display = Display.new(@board)
    @player_1 = player_1
    @player_2 = player_2
    @current_player = @player_1
    @current_color = "white"
  end

  def play
    until @board.checkmate?(@current_color)
      system("clear")
      @display.render

        puts "#{@current_player}'s turn:"
        begin
          start_pos = nil
          while start_pos.nil?
            start_pos = @display.cursor.get_input
            system("clear")
            @display.render
            puts "#{@current_player}'s turn:"
          end

          piece = @board[start_pos]
          raise if piece.color != @current_color
        rescue
          puts "Not your color."
          retry
        end

        end_position = nil
        while end_position.nil?
          end_position = @display.cursor.get_input
          system("clear")
          @display.render
          puts "#{@current_player}'s turn:"
        end
        @board.move(piece, end_position)

      change_player
    end

    change_player
    @display.render
    puts "#{@current_player} wins!!"

  end

  def change_player
    @current_player = @current_player == @player_1 ? @player_2 : @player_1
    @current_color = @current_color == "white" ? "black": "white"
  end

end

if __FILE__ == $PROGRAM_NAME
  game = Game.new("White", "Black")
  game.play
end
