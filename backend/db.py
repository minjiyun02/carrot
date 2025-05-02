from pymongo import Mongoclient

client = MongoClient("")
client = MongoClient("")

db = client[""]

collection = db[""]

data = collection.find()



# db.names.find({name: ""})
# db.createCollection()

