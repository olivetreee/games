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
  end
end
