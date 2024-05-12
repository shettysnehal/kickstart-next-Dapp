import React, { Component } from "react";
import Layout from "../../../components/layout";
import { Link } from "../../../routes";
import {
  Button,
  Table,
  TableBody,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableCell,
} from "semantic-ui-react";
import Campaign from "../../../etherum/campaign";
import web3 from "../../../etherum/web3";

export default class index extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();

    try {
      const approversCount = await campaign.methods
        .approversCount(index)
        .call();

      console.log("Approvers count:", approversCount);
      // Other code...

      const requests = await Promise.all(
        Array(parseInt(requestCount))
          .fill()
          .map((element, index) => {
            return campaign.methods.requests(index).call();
          })
      );

      return { address, requests, requestCount, approversCount }; // Return approversCount
    } catch (error) {
      console.error("Error fetching approvers count:", error);
    }
  }
  onapprove = async (index) => {
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(index).send({
      from: accounts[0],
    });
  };
  onfinalize = async (index) => {
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(index).send({
      from: accounts[0],
    });
  };

  render() {
    return (
      <Layout>
        <h3>Requests({Number(this.props.requestCount)})</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell>Description</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
              <TableHeaderCell>Recipient</TableHeaderCell>
              <TableHeaderCell>Approval</TableHeaderCell>
              <TableHeaderCell>Approve</TableHeaderCell>
              <TableHeaderCell>Finalize</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {this.props.requests.map((request, index) => (
              <TableRow
                key={index}
                disabled={request.complete}
                positive={
                  Number(request.approvalCount) >
                  Number(this.props.approversCount)
                }
              >
                <TableCell>{index}</TableCell>
                <TableCell>{request.description}</TableCell>
                <TableCell>{Number(request.value)}</TableCell>
                <TableCell>{request.recipient}</TableCell>
                <TableCell>
                  {Number(request.approvalCount)}/
                  {Number(this.props.approversCount)}
                </TableCell>

                <TableCell>
                  {request.complete ? null : (
                    <Button
                      color="green"
                      basic
                      onClick={() => this.onapprove(index)}
                    >
                      Approve
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  {request.complete ? null : (
                    <Button
                      color="teal"
                      basic
                      onClick={() => this.onfinalize(index)}
                    >
                      Finalize
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary>Add request</Button>
          </a>
        </Link>
      </Layout>
    );
  }
}
