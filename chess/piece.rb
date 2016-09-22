require 'colorize'
require 'byebug'
class Piece

PIECE_IN_UNICODE = {
  king:	"♔",
  queen: "♕",
  rook:	"♖",
  bishop:	"♗",
  knight:	"♘",
  pawn:	"♙"
}

  attr_reader :name, :value
  attr_accessor :board, :position
  def initialize(name, color, board, position)
    @color = color
    @name = name
    if color == "white"
      @value = PIECE_IN_UNICODE[name].white
    else
      @value = PIECE_IN_UNICODE[name].blue
    end
    @board = board
    @position = position
  end

  def color
    @color
  end

  def valid_moves
    possible_moves = self.moves
    possible_moves.reject { |pos| move_into_check?(pos) }
  end

  def move_into_check?(pos)
    new_board = @board.deep_dup
    new_board.move(new_board[self.position], pos)
    new_board.in_check?(self.color)
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

      while @board.is_inside_board?(new_pos)
        break if !@board.is_null_piece?(new_pos) &&
          !@board.is_opposing_piece?(new_pos,self.color)

        possible_positions.push(new_pos)
        break if @board.is_opposing_piece?(new_pos,self.color)

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

      while @board.is_inside_board?(new_pos)
        break if !@board.is_null_piece?(new_pos) &&
          !@board.is_opposing_piece?(new_pos,self.color)

        possible_positions.push(new_pos)
        break if @board.is_opposing_piece?(new_pos,self.color)

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
      if @board.is_inside_board?(new_pos) &&
          (@board.is_null_piece?(new_pos) || @board.is_opposing_piece?(new_pos, self.color))
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
      if @board.is_inside_board?(new_pos) &&
          (@board.is_null_piece?(new_pos) || @board.is_opposing_piece?(new_pos, self.color))
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
    diagonal_difference = self.color == "white" ? [[-1,-1], [-1, 1]] : [[1,1], [1, -1]]
    possible_moves = []

    #Not writing any code for taking another piece (i.e. moving diagonally)

    new_pos = @position.map.with_index {|pos, i| pos+difference[i]}
    if @board.is_inside_board?(new_pos) && @board.is_null_piece?(new_pos)
      possible_moves.push(new_pos)
    end
    diagonal_difference.each do |diff|
      new_pos = @position.map.with_index {|pos, i| pos+diff[i]}
      possible_moves.push(new_pos) if @board.is_inside_board?(new_pos) &&
      @board.is_opposing_piece?(new_pos, self.color)
    end
    possible_moves

  end

end
