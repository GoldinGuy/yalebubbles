import { collection, addDoc, doc, setDoc, getDoc, getCountFromServer } from "firebase/firestore";
// Base synthesis
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "src/utils/firebaseAuth";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
  
  const coll = collection(db, "yalies");
	const snapshot = await getCountFromServer(coll);
  if (snapshot) {
	  console.log("count: ", snapshot.data().count);
		return res.status(200).json({ count: (snapshot.data().count * 6) + 150 });
  }
	return res
			.status(400)
			.json({ result: "an error occurred while pulling crush count" });
}
