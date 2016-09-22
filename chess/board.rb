require_relative 'null_piece'
require_relative 'piece'
require 'byebug'
# require_relative 'display'

class Board
  attr_accessor :grid, :all_pieces
  def self.initialize_grid
    grid = Array.new(8) {Array.new(8) {NullPiece.instance}}
  end

  def initialize
    @grid = self.class.initialize_grid
    populate_grid
    @all_pieces = []
    store_all_pieces


  end

  def populate_grid
    # Pawns
    grid[1].map!.with_index {|cell,idx| Pawn.new(:pawn,"black",self,[1,idx])}
    grid[6].map!.with_index {|cell,idx| Pawn.new(:pawn,"white",self,[6,idx])}

    #Regular Pieces
    [0,7].each do |col|
      self[[0, col]] = Rook.new(:rook, "black", self, [0, col])
    end

    [0,7].each do |col|
      self[[7, col]] = Rook.new(:rook, "white", self, [7, col])
    end

    [1,6].each do |col|
      self[[0, col]] = Knight.new(:knight, "black", self, [0, col])
    end

    [1,6].each do |col|
      self[[7, col]] = Knight.new(:knight, "white", self, [7, col])
    end

    [2,5].each do |col|
      self[[0, col]] = Bishop.new(:bishop, "black", self, [0, col])
    end

    [2,5].each do |col|
      self[[7, col]] = Bishop.new(:bishop, "white", self, [7, col])
    end

    self[[0, 3]] = Queen.new(:queen, "black", self, [0, 3])
    self[[7, 3]] = Queen.new(:queen, "white", self, [7, 3])
    self[[0, 4]] = King.new(:king, "black", self, [0, 4])
    self[[7, 4]] = King.new(:king, "white", self, [7, 4])


  end

  def store_all_pieces
    (0..1).each { |i| @all_pieces << @grid[i] }
    (6..7).each { |i| @all_pieces << @grid[i] }
    @all_pieces.flatten!
  end

  def [](pos)
    x,y = pos
    @grid[x][y]
  end

  def []=(pos,value)
    x,y = pos
    @grid[x][y]=value
  end

  def move(start_pos,end_pos)
    #both have to be inside board
    #start pos has to be a piece
    #end pos has to be no piece
    raise "start position is outside the board" unless is_inside_board?(start_pos)
    raise "end position is outside the board" unless is_inside_board?(end_pos)
    raise "No piece at location" if self[start_pos].is_a?(NullPiece)
    raise "There is already a piece here" unless self[start_pos].is_a?(NullPiece)
  end

  def is_inside_board?(position)
    position.all? { |pos| (0..7).to_a.include?(pos)}
  end

  def is_null_piece?(pos)
    self[pos].is_a?(NullPiece)
  end

  def is_opposing_piece?(pos,current_color)
    return true if self[pos].color != current_color && !is_null_piece?(pos)
    false
  end

  def in_check?(color)
    #find the king of color
    # find opposing pieces
    # find possible moves of opposing Pieces
    # if any position
    king_pos = @all_pieces.select {|piece| piece.color == color &&
      :king == piece.name}.first.position
    opposing_pieces = @all_pieces.select {|piece| piece.color != color}
    opposing_pieces.each do |piece|
      # byebug if piece.name == :queen && piece.color == "black"
      return true if piece.moves.include?(king_pos)
    end
    false
  end

  def checkmate?(color)
    my_pieces = @all_pieces.select {|piece| piece.color == color}
    my_pieces.each do |piece|
      return false unless piece.valid_moves.empty?
    end
    true
    # false
  end

  def deep_dup
    new_board = self.dup
    new_board.grid = self.grid.dup
    new_board.grid.map!(&:dup)

    new_pieces = @all_pieces.map(&:dup)

    new_pieces.each do |piece|
      piece.board = new_board
      piece.position = piece.position.dup
      new_board[piece.position] = piece
    end

    new_board.all_pieces = new_pieces

    new_board

  end

  def move(piece, new_pos)
    # raise "Move will put you in check!" unless piece.valid_moves.include?(new_pos)

    possible_moves = piece.moves
    if possible_moves.include?(new_pos)
      take_piece(new_pos) if is_take_move?(new_pos)
      self[piece.position], self[new_pos] = self[new_pos], self[piece.position]
      piece.position = new_pos
    end
  end

  def take_piece(new_pos)
    self[new_pos] = NullPiece.instance
  end

  def is_take_move?(new_pos)
    return true unless self.is_null_piece?(new_pos)
    false
  end


end

a = Board.new
# p a.grid.[]([0,0])
# d=Display.new(a)
# d.render
