import { collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";
// Base synthesis
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "src/utils/firebaseAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log("submitting: ", req.body);
  const displayname = req.body?.displayname ?? "Anonymous";
  const uid = req.body?.uid ?? "0123456789";
  const email = req.body?.email ?? "UNKNOWN";
  const crushes = req.body?.crushes ?? [];

  if (email === "UNKNOWN" || crushes.length === 0) {
     return res
				.status(400)
				.json({ result: "an error occurred while adding the new user" });
  }

  // const docRef = doc(db, "yalies", "student");
	// const docSnap = await getDoc(docRef);

	// if (docSnap.exists()) {
	// 	console.log("Document data:", docSnap.data());
	// } else {
	// 	// doc.data() will be undefined in this case
	// 	console.log("No such document!");
	// }

  try {
    
    await setDoc(doc(db, "yalies", uid), {
			displayname: displayname,
			uid: uid,
			email: email,
			crushes: crushes,
    });
    return res.status(200)
      .json({ result: "successfully added new user" });
  } catch (e) {
    console.error("Error adding document: ", e);
    return res.status(400).json({ result: 'an error occurred while adding the new user' });
  }
}
