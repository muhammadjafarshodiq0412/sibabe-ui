/* eslint-disable react-hooks/exhaustive-deps */
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Row,
  Button,
  Col,
  Input
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import { getUser } from "services/users";
import Swal from "sweetalert2";
import Pagination from "react-js-pagination";
import { updateUser } from "services/users";

const User = () => {

  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    totalData: 0,
    totalPage: 0
  })
  const [loading, setLoading] = useState(false);

  const getUserList = async () => {
    setLoading(true);
    const response = await getUser({
      currentPage: page === 0 ? 0 : page - 1,
      limit: 10,
      filter: search,
      role: "USER"
    })
    if (response.error) {
      Swal.fire({
        icon: 'error',
        title: response.message,
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      setData(response.payload.content)
      const pageInfo = {
        totalData: response.payload.totalElements,
        totalPage: response.payload.totalPages
      }
      setPageInfo(pageInfo)
    }
    setLoading(false);
  }

  useEffect(() => {
    getUserList()
  }, [page])

  const handleChangePage = (page) => {
    setPage(page)
  }

  const bannedData = async (val) => {
    Swal.fire({
      icon: 'question',
      title: 'Banned User?',
      text: 'Apakah Anda Yakin?',
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak'
    }).then(async (value) => {
      if (value.isConfirmed) {
        setLoading(true)
        const response = await updateUser({
          "name": val.name,
          "phoneNumber": val.phoneNumber,
          "email": val.email,
          "username": val.username,
          "password": val.password,
          "role": "USER",
          "isActive": false
        }, val.id)
        if (response.error) {
          Swal.fire({
            icon: 'error',
            title: response.message,
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          Swal.fire({
            icon: 'success',
            title: response.message,
            showConfirmButton: false,
            timer: 1500
          })
          getUserList()
        }
        setLoading(false)
      }
    })
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col-12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <Col>
                    <h3 className="mb-0">List Data User</h3>
                  </Col>
                  <Col className="text-right d-flex align-items-center">
                    <Input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <Button color="primary" className="ml-2" type="button" onClick={getUserList}>
                      <i className="fa fa-search" />
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <div className="table-wrap">
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">NIK</th>
                      <th scope="col">Nama Tersangka</th>
                      <th scope="col">Username</th>
                      <th scope="col">Email</th>
                      <th scope="col">Status User</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <th colSpan="7" className="text-center">
                          Loading...
                        </th>
                      </tr>
                    ) : data.length > 0 ? data.map((val, idx) => {
                      return (
                        <tr key={String(idx)}>
                          <th scope="row">
                            {(Number(page + 1) * 10) - (10 - (idx + 1))}
                          </th>
                          <td>
                            {val.nik}
                          </td>
                          <td>
                            {val.name}
                          </td>
                          <td>
                            {val.username}
                          </td>
                          <td>
                            {val.email || "-"}
                          </td>
                          <td>
                            {val.isActive ? (
                              <Badge color="success">
                                Aktif
                              </Badge>
                            ) : (
                              <Badge color="danger">
                                Tidak Aktif
                              </Badge>
                            )}
                          </td>
                          <td>
                            <Button type="button" size="sm" color="danger" onClick={() => bannedData(val)}>
                              Banned
                            </Button>
                          </td>
                        </tr>
                      )
                    }) : (
                      <tr>
                        <th colSpan="7" className="text-center">
                          Data Kosong
                        </th>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
              <CardFooter className="py-4">
                {pageInfo.totalData > 0 && (
                  <div className="d-flex justify-content-end mt-4">
                    <Pagination
                      activePage={page + 1}
                      itemsCountPerPage={15}
                      totalItemsCount={pageInfo.totalData}
                      pageRangeDisplayed={3}
                      onChange={handleChangePage.bind(this)}
                      itemClass="page-item"
                      linkClass="page-link"
                    />
                  </div>
                )}
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default User;
