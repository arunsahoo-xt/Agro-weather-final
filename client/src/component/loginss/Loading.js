import {Spinner} from 'react-bootstrap';

const Loading = ({size=50}) => {
  return (
    <div
    style={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        height:"100%"
    }}
    >
        <Spinner
        style={{
            width:size,
            height:size,
            color:'skyblue'
        }}
        animation="border"/>
      </div>
  )
}

export default Loading