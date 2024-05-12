import React, { Component } from "react";
import { Button, CardGroup, Grid, GridColumn } from "semantic-ui-react";
import Layout from "../../components/layout";
import Campaign from "../../etherum/campaign";
import Contribute from "../../components/Contribute";
import { Link } from "../../routes";
export default class Show extends Component {
  static async getInitialProps(props) {
    try {
      const campaign = Campaign(props.query.address);

      const summary = await campaign.methods.getSummary().call();
      // console.log(summary)
      

      return {
        address: props.query.address,
        minimumContribution: summary[0],
        balance: summary[1],
        requestsCount: summary[2],
        approversCount: summary[3],
        manager: summary[4],
      };
    } catch (err) {
      console.log(err);
    }
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount,
    } = this.props;
    console.log(
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount
    );
    const items = [
      {
        header: <h4>{manager}</h4>,
        meta: "Address of manager",
        description:
          "The manager created this campaign and create rewuests to withdraw money",
        style: { overflowWrap: "break-word" },
      },
      {
        header: <h4>{Number(balance)}</h4>,
        meta: "campaign balance(wei)",
        description: "This is the total campaign balance",
      },
      {
        header: <h4>{Number(minimumContribution)}</h4>,
        meta: "Minimum Contribution (wei)",
        description: "Contribute atleast this much wei to become an approver",
      },
      {
        header: <h4>{Number(approversCount)}</h4>,
        meta: "Approvers Count",
        description:
          "This is the number of people contributed for this campaign",
      },
      {
        header: <h4>{Number(requestsCount)}</h4>,
        meta: "Requests Count",
        description:
          "This is the total number of requests the manager had made",
      },
    ];
    return <CardGroup items={items} />;
  }
  render() {
    return (
      <Layout>
        <h3>Campaign Show </h3>
        <Grid>
          <GridColumn width={10}>
            {this.renderCards()}
            <Link route={`/campaigns/${this.props.address}/requests`}>
              <a>
                <Button
                  style={{
                    marginTop: "30px",
                  }}
                  primary
                >
                  view Requests
                </Button>
              </a>
            </Link>
          </GridColumn>
          <GridColumn width={6}>
            <Contribute address={this.props.address} />
          </GridColumn>
        </Grid>
      </Layout>
    );
  }
}
