import { getFriendsForUser, getRestaurantsForUser } from "@/api_call/db_calls";
import { useEffect, useState } from "react";

//const { user } = useAuth();
export default async function buildMap() {
  const user = 1;
  let friendsList = new Array();
  const restosFriendsLike = new Map<Number, Number[]>();
  friendsList = await getFriendsForUser(user);
  /* getFriendsForUser(user).then((data) => {
    // setFriendsList(data);
    //console.log(data)
    friendsList = data;
    console.log("the friends list:", friendsList);
  });*/
  console.log("the friends list:", friendsList);
  // restosFriendsLike should be a map where the restaurant ids are the key and then we have
  //let restosFriendsLike = new Map<Number, Number[]>();
  // rest_id -> freind id

  for (let friend of friendsList) {
    let friendId = friend.friend_id;
    console.log(friendId);
    let response = await getRestaurantsForUser(friendId);

    for (let resto of response) {
      let restoId = resto.id;
      if (restosFriendsLike.has(restoId)) {
        restosFriendsLike.get(restoId)?.push(friendId);
      } else {
        restosFriendsLike.set(restoId, [friendId]);
      }
    }
  }
  return restosFriendsLike;
}

buildMap();
