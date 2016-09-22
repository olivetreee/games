require 'singleton'

class NullPiece
  include Singleton
  attr_reader :name, :color, :value
  def initialize
    @name = nil
    @value = " "
    @color = nil
  end
end
