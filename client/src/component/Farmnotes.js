import { IconButton, Input, Table } from 'rsuite';
import { Column, Cell, HeaderCell, ColumnGroup} from 'rsuite-table';
import React from 'react'
import Navbar from './Navbar';

 const rowKey = 'id';
 const ExpandCell = ({ rowData, dataKey, expandedRowKeys, onChange, ...props }) => (
   <Cell {...props}>
     <IconButton
       size="xs"
       appearance="subtle"
       onClick={() => {
         onChange(rowData);
       }}
       icon={
         expandedRowKeys.some((key) => key === rowData[rowKey]) ? <button><i class="fa-solid fa-square-minus darkbg"></i></button> :<button><i class="fa-solid fa-square-plus bluebg"></i></button>
       }
     />
   </Cell>
 );
 
 const renderRowExpanded = (rowData) => {
     console.log(rowData)
   return (
     <div>
       
       <p>{rowData.note}</p>
       <p>{rowData.created_on}</p>
     </div>
   );
 };
 
 const Farmnotes = () => {
   
   const [expandedRowKeys, setExpandedRowKeys] = React.useState([]);
   const [note, setNote] = React.useState('');
   const [noteData, setNoteData] = React.useState([]);
   const data = noteData;
   React.useEffect(() => {
   getNotes();
 }, []);
 const getNotes=async()=>{
    try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const {_id} = userInfo;
        console.log(_id);
          const response = await fetch(`/api/users/${_id}`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          })
          const data = await response.json();
          console.log(data);
          if (response.status == 400 || response.status == 500) { 
          }
          console.log(data);
          setNoteData(data.notes);
      }
      catch (error) {
      console.log(error);
      }  
     };
   const handleExpanded = (rowData, dataKey) => {
     let open = false;
     const nextExpandedRowKeys = [];

 
     expandedRowKeys.forEach((key) => {
       if (key === rowData[rowKey]) {
         open = true;
       } else {
         nextExpandedRowKeys.push(key);
       }
     });
 
     if (!open) {
       nextExpandedRowKeys.push(rowData[rowKey]);
     }
 
     setExpandedRowKeys(nextExpandedRowKeys);
   };
 
   const userLogin = async (e) => {
    e.preventDefault();
    try {
      var addnote = {
        "note":note,
        "created_on": new Date().toString().substr(4, 12)
      };
      if(note){
      console.log(addnote);
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const { _id } = userInfo;
      console.log(_id);
        const response = await fetch(`/api/users/${_id}/${addnote}`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ _id, addnote })
        })
        const data = await response.json();
        if (response.status == 400 || response.status == 500) {
         
        }
        console.log(data);
        setNoteData(data.notes);
        setNote("");
    }}
    catch (error) {
    console.log(error);
    }  
   }
   return (
       <div className='container-fluid vh-100'>
         <Navbar/>
           <div className='m-3 darkbg px-3 py-5'>
           <textarea type="textarea" className="txtarea" rows={3} placeholder="Add Note" 
            value={note}
            onChange={(e) => setNote(e.target.value)}/>
            <div className='text-center m-2'><button className='btn btn-primary' onClick={userLogin}>Add Note <i class="fa-solid fa-plus"></i></button></div>
           </div>
           <div>
     <Table
     
      className="rs-theme-dark text-white"
       height={420}
       data={data}
       rowKey={rowKey}
       expandedRowKeys={expandedRowKeys}
       onRowClick={(data) => {
         console.log(data);
       }}
       renderRowExpanded={renderRowExpanded}
     >
       <Column flexGrow={1} align="center">
         <HeaderCell>#</HeaderCell>
         <ExpandCell dataKey="id" expandedRowKeys={expandedRowKeys} onChange={handleExpanded} />
       </Column>
 
       <Column flexGrow={2}>
         <HeaderCell>Notes</HeaderCell>
         <Cell dataKey="note" />
       </Column>
       <Column flexGrow={2}>
         <HeaderCell>Created on</HeaderCell>
         <Cell dataKey="created_on" />
       </Column>
     </Table>
     </div></div>
   );
 };
 
export default Farmnotes;