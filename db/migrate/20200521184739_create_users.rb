class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :password_digest
      t.string :password_confirmation
      t.decimal :account_balance, precision: 14, scale: 6

      t.timestamps
    end
  end
end
