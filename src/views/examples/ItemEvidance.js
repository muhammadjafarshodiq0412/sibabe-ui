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
import ModalInputItem from "components/Modal/InputItem";
import { useEffect, useState } from "react";
import { getItemEvidance } from "services/itemEvidances";
import { getCategory } from "services/categories";
import Swal from "sweetalert2";
import Pagination from "react-js-pagination";
import { deleteItemEvidance } from "services/itemEvidances";

const ItemEvidance = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [created, setCreated] = useState(true);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [dataModal, setDataModal] = useState('');
  const [optionCategory, setOptionCategory] = useState([]);
  const [data, setData] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    totalData: 0,
    totalPage: 0
  })
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const getItemEvidanceList = async () => {
    setLoading(true);
    const response = await getItemEvidance({
      currentPage: page === 0 ? 0 : page - 1,
      limit: 10,
      filter: search,
      category: "",
      status: ""
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

  const getDataCategory = async () => {
    const response = await getCategory()
    if (!response.error) {
      if (response?.payload?.content?.length > 0) {
        const dataCategory = response.payload.content.map(val => {
          return {
            label: val.value,
            value: val.id
          }
        })
        setOptionCategory(dataCategory)
      }
    }
  }

  useEffect(() => {
    getItemEvidanceList()
  }, [page])

  const handleChangePage = (page) => {
    setPage(page)
  }

  const deleteData = async (id) => {
    Swal.fire({
      icon: 'question',
      title: 'Hapus Data?',
      text: 'Apakah Anda Yakin?',
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak'
    }).then(async (value) => {
      if (value.isConfirmed) {
        setLoading(true)
        const response = await deleteItemEvidance(id)
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
          getItemEvidanceList()
        }
        setLoading(false)
      }
    })
  }

  return (
    <>
      <ModalInputItem toggle={toggle} isOpen={isOpen} created={created} payload={dataModal} listCategory={optionCategory} getData={getItemEvidanceList} detail={detail} />
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
                    <h3 className="mb-0">List Barang Bukti</h3>
                  </Col>
                  <Col className="text-right d-flex align-items-center">
                    <Input placeholder="Search" onChange={(e) => setSearch(e.target.value)} value={search} />
                    <Button color="primary" className="ml-2" type="button" onClick={getItemEvidanceList}>
                      <i className="fa fa-search" />
                    </Button>
                  </Col>
                </Row>
                <Button size="sm" color="primary" onClick={async () => {
                  setDetail(false)
                  await getDataCategory()
                  setCreated(true)
                  toggle()
                }}>Input Barang Bukti</Button>
              </CardHeader>
              <div className="table-wrap">
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Nomor Register Bukti (BA-5)</th>
                      <th scope="col">Nama Tersangka</th>
                      <th scope="col">Perkara</th>
                      <th scope="col">Barang Bukti</th>
                      <th scope="col">Status</th>
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
                          <td>{val.noRegBukti}</td>
                          <td>{val.namaTersangka}</td>
                          <td>
                            {val.perkara}
                          </td>
                          <td>
                            {val.barangBukti1}
                          </td>
                          <td>
                            {val.statusNoReg === 'OPEN' && (
                              <Badge color="danger">
                                Belum Isi Form
                              </Badge>
                            )}
                            {val.statusNoReg === 'CLAIM' && (
                              <Badge color="warning">
                                Sudah Isi Form
                              </Badge>
                            )}
                            {val.statusNoReg === 'CLOSE' && (
                              <Badge color="success">
                                Sudah Di Ambil
                              </Badge>
                            )}
                          </td>
                          <td className="text-right">
                            <div className="d-flex align-items-center">
                              <Button type="button" size="sm" onClick={async () => {
                                setDetail(true)
                                await getDataCategory()
                                setCreated(false);
                                setDataModal(val);
                                toggle();
                              }}>
                                <i className="fa fa-eye" />
                              </Button>
                              <Button type="button" size="sm" onClick={async () => {
                                setDetail(false)
                                await getDataCategory()
                                setCreated(false);
                                setDataModal(val);
                                toggle();
                              }}>
                                <i className="fa fa-edit" />
                              </Button>
                              <Button type="button" size="sm" onClick={() => deleteData(val.id)}>
                                <i className="fa fa-trash text-danger" />
                              </Button>
                            </div>
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
                      itemsCountPerPage={10}
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

export default ItemEvidance;
