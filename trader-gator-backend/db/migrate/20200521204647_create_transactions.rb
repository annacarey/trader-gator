class CreateTransactions < ActiveRecord::Migration[6.0]
  def change
    create_table :transactions do |t|
      t.references :user, null: false, foreign_key: true
      t.string :stock_name
      t.string :ticker_symbol
      t.integer :quantity
      t.decimal :current_price_per_share, precision: 12, scale: 6
      t.decimal :total_price, precision: 12, scale: 6

      t.timestamps
    end
  end
end
