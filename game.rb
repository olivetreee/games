require_relative 'board'

class Minesweeper
  def initialize(size)
    @board = Board.new(size)

  end

  def run
    while true
      @board.render
      play_turn
    end
  end

  def play_turn
    pos = gets.chomp
    p @board.find_neighbors([8,8])
  end
end

if __FILE__ == $PROGRAM_NAME
  new_game = Minesweeper.new(9)
  new_game.run
end
