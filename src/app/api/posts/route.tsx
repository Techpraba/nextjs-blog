import connectMongo from "@/utils/mongodb";
import postModel from "@/models/postModel";
export async function GET(req: any) {
    const query = req.nextUrl.searchParams.get('q');
    console.log(query,"this is the query"); 
    try {
        await connectMongo();
        let postData;
        if (query) { 
            postData = await postModel.find({

                $or: [
                    { title: new RegExp(query, 'i') },
                    {description: new RegExp(query,'i')}
                    
                ]
            })
        } else {
            postData = await postModel.find({});
        }
       
        return Response.json(postData);
    } catch (error) {
        return Response.json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
  
}
