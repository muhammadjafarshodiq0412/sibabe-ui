/* eslint-disable react-hooks/exhaustive-deps */
import ModalInputItem from 'components/Modal/InputItem';
import HomeNavbar from 'components/Navbars/HomeNavbar'
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import Pagination from 'react-js-pagination';
import { useHistory } from 'react-router-dom';
import { Button, Card, CardFooter, Container, FormGroup, Input, Label, Table } from 'reactstrap'
import { getCategory } from 'services/categories';
import { getItemEvidance } from 'services/itemEvidances';
import Swal from 'sweetalert2';

const ItemEvidance = () => {

  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    totalData: 0,
    totalPage: 0
  })
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [detail, setDetail] = useState(false);
  const [dataModal, setDataModal] = useState('');
  const [created, setCreated] = useState(true);
  const [optionCategory, setOptionCategory] = useState([]);

  const history = useHistory();

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

  useEffect(() => {
    getItemEvidanceList()
  }, [page])

  const handleChangePage = (page) => {
    setPage(page)
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

  return (
    <div>
      <ModalInputItem toggle={toggle} isOpen={isOpen} created={created} payload={dataModal} listCategory={optionCategory} getData={getItemEvidanceList} detail={detail} user={true} />
      <HomeNavbar>
        <Container className="py-3">
          <FormGroup>
            <Label>Cari Barang Bukti</Label>
            <div className="d-flex align-items-center">
              <Input placeholder="Inputkan nomor register bukti/nomor tersangka/barang bukti/nomor polisi/nomor rangka/nomor mesin" onChange={(e) => setSearch(e.target.value)} />
              <Button className="ml-3" type='button' onClick={getItemEvidanceList}><i className="fa fa-search" /></Button>
            </div>
          </FormGroup>
          <Card className="shadow">
            <div className="table-wrap">
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Nomor Register Bukti (BA-5)</th>
                    <th scope="col">Nama Tersangka</th>
                    <th scope="col">Perkara</th>
                    <th scope="col">Barang Bukti</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <th colSpan="5" className="text-center">
                        Loading...
                      </th>
                    </tr>
                  ) : data.length > 0 ? data.map((val, idx) => {
                    return (
                      <tr key={String(idx)}>
                        <td>{val.noRegBukti}</td>
                        <td>{val.namaTersangka}</td>
                        <td>
                          {val.perkara}
                        </td>
                        <td>
                          {val.barangBukti1}
                        </td>
                        <td className="text-right">
                          <Button size="sm" type='button' onClick={async () => {
                            const profileCookies = Cookies.get('_P01e')
                            if (profileCookies) {
                              setDetail(true)
                              await getDataCategory()
                              setCreated(false);
                              setDataModal(val);
                              toggle();
                            } else {
                              Swal.fire({
                                icon: 'error',
                                title: 'Silahkan Login Terlebih Dahulu untuk Klaim',
                                showConfirmButton: false,
                                timer: 1500
                              }).then(() => {
                                history.push('/auth/login')
                              })
                            }
                          }}>Ambil / Klaim</Button>
                        </td>
                      </tr>
                    )
                  }) : (
                    <tr>
                      <th colSpan="5" className="text-center">
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
        </Container>
      </HomeNavbar>
    </div>
  )
}

export default ItemEvidance