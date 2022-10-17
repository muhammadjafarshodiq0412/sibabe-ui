import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  Badge
} from "reactstrap";

import Header from "components/Headers/Header.js";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { getItemEvidance } from "services/itemEvidances";

const Index = (props) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getItemEvidanceList = async () => {
    setLoading(true);
    const response = await getItemEvidance({
      currentPage: 0,
      limit: 5,
      filter: "",
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
    }
    setLoading(false);
  }

  useEffect(() => {
    getItemEvidanceList()
  }, [])

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">List Barang Bukti Terbaru</h3>
                  </div>
                </Row>
              </CardHeader>
              <div className="table-wrap">
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Nomor Register Bukti (BA-5)</th>
                      <th scope="col">Nama Tersangka</th>
                      <th scope="col">Perkara</th>
                      <th scope="col">Barang Bukti</th>
                      <th scope="col">Status Ambil</th>
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
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
