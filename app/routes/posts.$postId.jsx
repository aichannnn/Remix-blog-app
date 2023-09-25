import { Link, useLoaderData } from "@remix-run/react"
import {db} from "../utils/db.server"
import { redirect } from "@remix-run/node"

export const loader = async ({params})=>{
  const post = await db.post.findUnique({
    where: {id: params.postId}
  })
  if(!post) throw new Error('Post not found')

  const data = {post}
  return data
}

export const action = async ({request,params}) =>{
  const form = await request.formData()
  if(form.get('_method')==='delete'){
    const post = await db.post.findUnique({
      where: {id: params.postId}
    })
    if(!post) throw new Error('Post not found')

    await db.post.delete({where: {id:params.postId}})
    return redirect('/posts/index')
  }
}

function Post() {
  const {post} = useLoaderData()
  return (
    <div>
      <div className="page-header">
        <h1>{post.title}</h1>
        <Link to='/posts/index' className="btn btn-reverse">
          Back
        </Link>
      </div>
     <div className="page-header">{post.body}</div>

     <div className="page-footer">
      <form  method="post">
        <input type="hidden" name="_method" value="delete"/>
        <button className="btn btn-delete">Delete</button>
      </form>
     </div>
    </div>
  )
}

export default Post
