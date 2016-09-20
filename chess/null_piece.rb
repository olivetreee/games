require 'singleton'

class NullPiece
  include Singleton
  attr_reader :name
  def initialize
    @name = " "
  end
end
