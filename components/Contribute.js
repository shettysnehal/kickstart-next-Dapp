import React, { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Campaign from "../etherum/campaign";
import web3 from "../etherum/web3";

export default function Contribute(props) {
  const [value, setValue] = useState();
  const [loading, setloading] = useState(false);
  const [errmsg, seterrmsg] = useState("");
  const [error, seterror] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setloading(true);

    const campaign = Campaign(props.address);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: value,
      });
      Router.replaceRoute(`/campaigns/${this.props.address}`);
    } catch (err) {
      console.error(err);
      seterror(true);
      seterrmsg(err.message);
    }
    setloading(false);
    setValue();
  };

  return (
    <Form onSubmit={onSubmit} style={{ marginTop: "60px" }} error={error}>
      <Form.Field>
        <label style={{ marginBottom: "15px" }}>
          <h3>Become a contributor!!</h3>
        </label>
        <Input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          label="Wei"
          labelPosition="right"
        />
      </Form.Field>
      <Message error header="oops!" content={errmsg} />
      <Button primary loading={loading}>
        Contribute!!
      </Button>
    </Form>
  );
}
