import { redirect } from "@remix-run/node"
import { Link } from "@remix-run/react"
import { db } from "../utils/db.server"

export const action = async ({request}) =>{
    const form = await request.formData()
    const title = form.get('title')
    const body = form.get('body')
    
    const fields = {title, body}
   
    const post = await db.post.create({data:fields})

    return redirect(`/posts/${post.id}`)
}

function NewPost() {
    return (
      <>
      <div className="page-header">
        <h1>New Post</h1>
        <Link to='/posts/index' className="btn btn-reverse">
            Back
        </Link>
      </div>
        
        <div className="page-content">
            <form method="post">
                <div className="from-control">
                    <label htmlFor="title">Title</label><br />
                    <input type="text"  name="title" id="title"/>
                </div>
                <div className="from-control">
                    <label htmlFor="body">Post Body</label><br />
                    <textarea name="body" id="body"/>
                </div>
                <button type='submit'  className="btn btn-block">
                    Add Post
                </button>
            </form>
        </div>

      </>
    )
  }


  
  export default NewPost