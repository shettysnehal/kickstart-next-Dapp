import React from "react";
import Layout from "../../components/Layout";
import { FormField, Button, Input, Form, Message } from "semantic-ui-react";
import { useState } from "react";
import factory from "../../etherum/factory";
import web3 from "../../etherum/web3";
import { Router } from "../../routes";

export default function newCampaign() {
  const [minimumcontribution, setminimumcontribution] = useState();
  const [error, seterror] = useState();
  const [errmsg, seterrmsg] = useState("");
  const [loading, setloading] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    seterrmsg(false);
    setloading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      event.preventDefault;
      await factory.methods.createCampaign(minimumcontribution).send({
        from: accounts[0],
      });
      Router.pushRoute("/");
    } catch (err) {
      seterror(err.message);
      seterrmsg(true);
    }
    setloading(false);
  };
  return (
    <Layout>
      <h3>Create a Campaign</h3>
      <Form onSubmit={onSubmit} error={errmsg}>
        <FormField>
          <label>Minimum contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minimumcontribution}
            onChange={(event) => setminimumcontribution(event.target.value)}
          />
        </FormField>
        <Message error header="oops!" content={error} />
        <Button loading={loading} primary>
          Create!
        </Button>
      </Form>
    </Layout>
  );
}
