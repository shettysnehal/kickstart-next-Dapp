import React, { Component } from "react";
import Layout from "../../../components/layout";
import { Button, Form, FormField, Input, Message } from "semantic-ui-react";
import Campaign from "../../../etherum/campaign";
import web3 from "../../../etherum/web3";
import { Router } from "../../../routes";

export default class New extends Component {
  state = {
    value: "",
    description: " ",
    recipientAddress: "",
    errorMessage: "",
    loading: false,
    error: false,
  };
  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }
  onsubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const campaign = Campaign(this.props.address);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(
          this.state.description,
          this.state.value,
          this.state.recipientAddress
        )
        .send({
          from: accounts[0],
        });
    } catch (err) {
      console.log(err);
      this.setState({ error: true });
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };
  render() {
    return (
      <Layout>
        <h3>Create a request </h3>
        <Form onSubmit={this.onsubmit} error={this.state.error}>
          <FormField>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={(event) =>
                this.setState({ description: event.target.value })
              }
            />
          </FormField>
          <FormField>
            <label>value(wei)</label>
            <Input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </FormField>
          <FormField>
            <label>Recipient address</label>
            <Input
              value={this.state.recipientAddress}
              onChange={(event) =>
                this.setState({ recipientAddress: event.target.value })
              }
            />
          </FormField>
          <Button primary loading={this.state.loading}>
            Create!!
          </Button>
          <Message error header="oops!" content={this.state.errorMessage} />
        </Form>
      </Layout>
    );
  }
}
