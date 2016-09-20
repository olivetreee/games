require_relative 'board'
require 'byebug'

class Minesweeper
  def initialize(size,difficulty)
    @board = Board.new(size,difficulty)

  end

  def self.new_game
    system("clear")
    begin
    puts "Please input difficulty level (1-10):"
    difficulty = gets.chomp
    # byebug
    difficulty = Integer(difficulty)
    raise unless (1..10).cover?(difficulty)
    rescue
      retry
    end

  Minesweeper.new(9,difficulty).run

  end

  def run

    found_bomb = false

    until found_bomb || game_over?
      system("clear")
      @board.render
      found_bomb = play_turn
    end
    system("clear")
    @board.cheat = true
    @board.render
    puts found_bomb ? "You hit a bomb." : "You win!"
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

    if @board[position].bomb && choice != "f" && !@board[position].flag
      @board.reveal_tile(position)
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

  Minesweeper.new_game
  # begin
  #   puts "Please input difficulty level (1-10):"
  #   difficulty = gets.chomp
  #   # byebug
  #   difficulty = Integer(difficulty)
  # rescue "Please input a valid difficulty level (1-10):"
  #   retry
  # end
  #
  # new_game = Minesweeper.new(9,difficulty)
  # new_game.run
end
