require_relative 'board'
require 'byebug'

class Minesweeper
  def initialize(size)
    @board = Board.new(size)

  end

  def run
    found_bomb = false

    until found_bomb || game_over?
      @board.render
      found_bomb = play_turn
    end

    puts found_bomb ? "You hit bomb." : "You win!"
  end

  def play_turn
    # debugger
    puts "Type your input (x,y,'f' for flag or 'r' for reveal)"
    input = gets.chomp.split(",")

    until input && valid_input?(input)
      puts "Type your input (x,y,'f' for flag or 'r' for reveal)"
      input = gets.chomp.split(",")
    end

    choice = input.pop.downcase
    position = input.map(&:to_i)

    if @board[position].bomb
      return true
    end

    if choice == "r" && !@board[position].flag
      neighbors = @board.find_neighbors_positions(position)
      @board[position].show = true
      @board[position].value = " "
      neighbors.each do |neighbor|
        @board.reveal_tile(neighbor) unless @board[neighbor].bomb
      end
    elsif choice == 'f'
      @board[position].flag = !@board[position].flag
    end

    false
  end

  def game_over?
    @board.over?
  end

  def valid_input?(input)
    choice = input.last.downcase
    position = input[0..-2].map(&:to_i)
    valid_choice?(choice) && valid_position?(position)
  end

  def valid_choice?(choice)
    ["r", "f"].include?(choice)
  end

  def valid_position?(pos)
    return false if @board[pos].show
    pos.all? { |n| n.between?(0, @board.size - 1) }
  end

end

if __FILE__ == $PROGRAM_NAME
  new_game = Minesweeper.new(9)
  new_game.run
end
