import { useRouter } from 'next/router'
import AuthCheck from '../../components/AuthCheck'
import { useState } from 'react'
import { getDoc, doc, db } from '../../lib/firebase'
import { useForm } from 'react-hook-form'

export default function AdminPostEdit(props) {
  return (
    <AuthCheck>
      <PostManager />
    </AuthCheck>
  )
}

function PostManager() {
  const [preview, setPreview] = useState(false)

  const router = useRouter()
  const { slug } = router.query

  // const postRef = getDoc(doc(db, `books`, '0otv080KpGEDXaQBpffq'))
  // const [post] = useDocumentData(postRef)

  return <PostForm />
}

function updatePost() {
  console.log('updatePost')
}

function PostForm({ defaultValues, postRef, preview }) {
  const { register, handleSubmit, reset, watch, formState, errors } = useForm({
    defaultValues,
    mode: 'onChange',
  })

  const { isValid, isDirty } = formState

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          className="form-control"
          {...register('title', { required: true })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          className="form-control"
          {...register('description', { required: true })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="body">Body</label>
        <textarea
          name="body"
          id="body"
          className="form-control"
          {...register('body', { required: true })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="author">Author</label>
        <input
          type="text"
          name="author"
          id="author"
          className="form-control"
          {...register('author', { required: true })}
        />
      </div>
      <button type="submit" className="btn btn-primary" disabled={!isDirty || !isValid}>
        {preview ? 'Preview' : 'Update'}
      </button>
    </form>
  )
}
