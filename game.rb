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
    pos = [0,0]
    if @board[pos].bomb
      puts "You lost"
    end
    neighbors = @board.find_neighbors_positions(pos)
    neighbors.each do |neighbor|
      @board.reveal_tile(neighbor) unless @board[neighbor].bomb
    end
  end
end

if __FILE__ == $PROGRAM_NAME
  new_game = Minesweeper.new(9)
  new_game.run
end
