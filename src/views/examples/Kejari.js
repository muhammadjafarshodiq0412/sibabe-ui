// reactstrap components
import {
    Card,
    CardHeader,
    CardFooter,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table,
    Container,
    Row,
    Button,
    Col,
    Input
  } from "reactstrap";
  // core components
  import Header from "components/Headers/Header.js";
import ModalKejari from "components/Modal/Kejari";
import { useState } from "react";
  
  const Kejari = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [created, setCreated] = useState(true);

    const toggle = () => setIsOpen(!isOpen);

    return (
      <>
      <ModalKejari isOpen={isOpen} created={created} toggle={toggle} />
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
                      <h3 className="mb-0">List Kejari</h3>
                    </Col>
                    <Col className="text-right d-flex align-items-center">
                      <Input placeholder="Search" />
                      <Button color="primary" className="ml-2">
                        <i className="fa fa-search" />
                      </Button>
                    </Col>
                  </Row>
                  <Button size="sm" color="primary" onClick={toggle}>Tambah Kejari</Button>
                </CardHeader>
                <div className="table-wrap">
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Nama Kejari</th>
                        <th scope="col">Nomor Whatsapp</th>
                        <th scope="col">Email Aktif</th>
                        <th scope="col">Username</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">
                          1
                        </th>
                        <td>Kejaksaan Negeri Medan</td>
                        <td>0888888888</td>
                        <td>
                          Jafar@gmail.com
                        </td>
                        <td>
                          Jafar
                        </td>
                        <td className="text-right">
                          <div className="d-flex align-items-center">
                            <Button type="button" size="sm">
                              <i className="fa fa-edit" />
                            </Button>
                            <Button type="button" size="sm">
                              <i className="fa fa-trash text-danger" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  };
  
  export default Kejari;
  