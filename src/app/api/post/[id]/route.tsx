import connectMongo from "@/utils/mongodb";
import postModel from "@/models/postModel";


import { NextApiRequest } from 'next';

export async function GET(req: NextApiRequest, { params }: { params: { id: string } }) {
    try {
        await connectMongo();
        const postData = await postModel.findOne({ _id: params.id });
         return Response.json(postData);
    } catch (error) {
        return Response.json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
  
}
 