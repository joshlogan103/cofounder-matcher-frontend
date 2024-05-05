import { Spinner } from '@radix-ui/themes'

const Loading = () => {
  return (
    <div style={{
      height: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Spinner />
    </div>
  )
}

export default Loading