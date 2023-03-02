import { db } from "../connect.js";

export const getItem = (req, res) => {
    const userId = req.params.userId;
    const q = "SELECT * FROM todoitems WHERE userId=?";

    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
};

export const addItem = (req, res) => {
        const q =
            "INSERT INTO todoitems(`userId`, `toDoItem`) VALUES (?)";
        const values = [
            req.body.userId, 
            req.body.toDoItem, 
        ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Item has been added");
    });
};

export const updateItem = (req, res) => {
      const q =
        "UPDATE todoitems SET `toDoItem`=? WHERE id=? ";
  
      db.query(
        q,
        [
          req.body.toDoItem,
          req.params.itemId,
        ],
        (err, data) => {
          if (err) res.status(500).json(err);
          if (data.affectedRows > 0) return res.json("Updated!");
          return res.status(403).json("You can update only your item!");
        }
      );
  };

export const deleteItem = (req, res) => {
      const q =
        "DELETE FROM todoitems WHERE `id`=?";
  
      db.query(q, [req.params.itemId], (err, data) => {
        if (err) return res.status(500).json(err);
        if(data.affectedRows>0) return res.status(200).json("Post has been deleted.");
        return res.status(403).json("You can delete only your item")
      });
  };