require 'colorize'
class Piece

PIECE_IN_UNICODE = {
  king:	"♔",
  queen: "♕",
  rook:	"♖",
  bishop:	"♗",
  knight:	"♘",
  pawn:	"♙"
}

  attr_reader :name
  def initialize(name, color, board, position)
    @color = color
    if color == "white"
      @name = PIECE_IN_UNICODE[name].white
    else
      @name = PIECE_IN_UNICODE[name].blue
    end
    @board = board
    @position = position
  end


end

class SlidingPiece < Piece
  def moves
    directions = self.move_dirs
    case directions

    when :diagonal
      calculate_diagonal_positions

    when :horiz_vert
      calculate_horiz_vert_positions

    when :all
      calculate_diagonal_positions + calculate_horiz_vert_positions
    end

  end

  def calculate_diagonal_positions
    possible_positions = []
    differences = [[1, 1], [1, -1], [-1, 1], [-1, -1]]
    differences.each do |diff|
      new_pos = @position.map.with_index {|pos, i| pos+diff[i]}
      while @board.is_inside_board?(new_pos) && @board.is_null_piece?(new_pos)
        possible_positions.push(new_pos)
        new_pos = new_pos.map.with_index {|pos, i| pos+diff[i]}
      end
    end
    possible_positions
  end

  def calculate_horiz_vert_positions
    possible_positions = []
    differences = [[0, 1], [0, -1], [1, 0], [-1, 0]]
    differences.each do |diff|
      new_pos = @position.map.with_index {|pos, i| pos+diff[i]}
      while @board.is_inside_board?(new_pos) && @board.is_null_piece?(new_pos)
        possible_positions.push(new_pos)
        new_pos = new_pos.map.with_index {|pos, i| pos+diff[i]}
      end
    end
    possible_positions

  end

end

class SteppingPiece < Piece
  def initialize(name, color, board, position)
    super
  end

  def moves
    self.calculate_possible_moves
  end

end

class Bishop < SlidingPiece
  def initialize(name, color, board, position)
    super
  end

  def move_dirs
    :diagonal
  end
end

class Rook < SlidingPiece
  def initialize(name, color, board, position)
    super
  end
  def move_dirs
    :horiz_vert
  end
end

class Queen < SlidingPiece
  def initialize(name, color, board, position)
    super
  end
  def move_dirs
    :all
  end
end

class Knight < SteppingPiece
  def initialize(name, color, board, position)
    super
  end

  def calculate_possible_moves
    possible_moves = []
    differences = [[-2, 1], [-1, 2], [1,2], [2,1], [2, -1], [1,-2], [-1, -2], [-2, -1]]
    differences.each do |diff|
      new_pos = @position.map.with_index {|pos, i| pos+diff[i]}
      if @board.is_inside_board?(new_pos) && @board.is_null_piece?(new_pos)
        possible_moves.push(new_pos)
      end
    end
    possible_moves
  end

end

class King < SteppingPiece
  def initialize(name, color, board, position)
    super
  end

  def calculate_possible_moves
    possible_moves = []
    differences = [[1, 1], [1, -1], [-1, 1], [-1, -1], [0, 1], [0, -1], [1, 0], [-1, 0]]
    differences.each do |diff|
      new_pos = @position.map.with_index {|pos, i| pos+diff[i]}
      if @board.is_inside_board?(new_pos) && @board.is_null_piece?(new_pos)
        possible_moves.push(new_pos)
      end
    end
    possible_moves
  end
end

class Pawn < Piece
  def initialize(name, color, board, position)
    super
  end

  def moves
    difference = self.color == "white" ? [-1,0] : [1,0]
    possible_moves = []

    #Not writing any code for taking another piece (i.e. moving diagonally)

    new_pos = @position.map.with_index {|pos, i| pos+difference[i]}
    if @board.is_inside_board?(new_pos) && @board.is_null_piece?(new_pos)
      possible_moves.push(new_pos)
    end

    possible_moves

  end

end
