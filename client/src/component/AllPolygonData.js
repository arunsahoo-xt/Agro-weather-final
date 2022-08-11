import React from 'react'
import { render } from 'react-dom';
import { Modal, Table } from 'rsuite';

import { useNavigate } from 'react-router-dom';


// const data = fakeData.filter((v, i) => i < 8);
const AllPolygonData = ({ polyData }) => {
  const [open, setOpen] = React.useState(false);
  const [sortColumn, setSortColumn] = React.useState();
  const [sortType, setSortType] = React.useState();
  const [loading, setLoading] = React.useState(false);
  let navigate = useNavigate();
  console.log("polypagee");
  console.log(polyData);
  const data = polyData;
  const getData = () => {
    if (sortColumn && sortType) {
      return data.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === 'string') {
          x = x.charCodeAt();
        }
        if (typeof y === 'string') {
          y = y.charCodeAt();
        }
        if (sortType === 'asc') {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return data;
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };
  return (


    <div className='container-fluid mt-5 mb-5 darkbg rounded' >

      <div className='card shadow darkbg rounded'>
        <button className='btn btn-pink-moon font-monospace my-3' style={{ maxWidth: 300 }}
          onClick={() => { navigate("/create") }}>Create Polygon</button>
        <div className='card-body greybg text-white text-center mb-3'>

          <Table
           
            height={420}
            data={getData()}
            className="rs-theme-high-contrast"
            sortColumn={sortColumn}
            sortType={sortType}
            onSortColumn={handleSortColumn}
            loading={loading}
            onRowClick={data => {
              console.log(data._id);
            }}
          >
            <Table.Column flexGrow={2} align="center" sortable className="bluebg">
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.Cell dataKey="name" />
            </Table.Column>

            <Table.Column flexGrow={1.5} sortable>
              <Table.HeaderCell>Area</Table.HeaderCell>
              <Table.Cell dataKey="area" />
            </Table.Column>

            <Table.Column flexGrow={2} sortable>
              <Table.HeaderCell>Created On</Table.HeaderCell>
              <Table.Cell dataKey="created_on" />
            </Table.Column>
            <Table.Column flexGrow={1} >
              <Table.HeaderCell>Action</Table.HeaderCell>

              <Table.Cell>
                {rowData => {
                  const handleAction = async () => {

                    var polygon_id = rowData._id;
                    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
                    const { _id } = userInfo;
                    // var _id=data._id;
                    console.log(_id);
                    try {
                      setLoading(true);
                      const response = await fetch(`/api/users/${_id}`, {
                        method: 'PATCH',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ _id, polygon_id })
                      })
                      const data = await response.json();

                      if (response.status == 400) {
                        // setError(data.message)
                        console.log(data.message);
                      }
                      else {
                        console.log(data);
                        localStorage.setItem("userInfo", JSON.stringify(data));
                        // forceUpdate();
                        navigate("/deleting");
                        setLoading(false);

                      }
                    }
                    catch (err) {
                      console.log(err)


                    }
                  }
                  return (
                    <span>
                      {/* <a onClick={handleAction}><i className='fas fa-edit'></i></a> | */}
                      <a onClick={()=>{setOpen(true);}}><i className='fas fa-close fa-lg'></i></a>
                      <Modal open={open} onClose={()=>{setOpen(false);}}>
        <Modal.Header>
          <Modal.Title className='font-monospace'> <i class="fa-solid fa-trash "></i> Delete Polygon</Modal.Title>
        </Modal.Header>
        <Modal.Body className='font-monospace'>
          <h5>Are you sure you want to delete</h5>
        </Modal.Body>
        <Modal.Footer>
        <button className="btn btn-danger m-1" 
         onClick={handleAction}>Ok</button> 
          <button onClick={()=>{setOpen(false)}} className="btn btn-primary">
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
                    </span>
                  );
                }}
              </Table.Cell>
            </Table.Column>
          </Table>

        </div></div></div>

  )
}

export default AllPolygonData