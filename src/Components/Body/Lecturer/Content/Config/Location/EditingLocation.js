import { Form, Input, Button } from "antd";
import "../../../Lecturer.css"

export const EditingLocation = (props) => {
  const setLocationSectionView = props.setLocationSectionView;
  let editLocation = props.editLocation;

  return (
    <>
      <div className="editLocationForm">
        <Form>
          <Form.Item name="note" label="ID" rules={[{ required: true }]}>
            <Input defaultValue={editLocation.id} disabled />
          </Form.Item>
          <Form.Item name="note" label="Name" rules={[{ required: true }]}>
            <Input defaultValue={editLocation["Location name"]} />
          </Form.Item>
          <Form.Item name="note" label="Address" rules={[{ required: true }]}>
            <Input defaultValue={editLocation["Location address"]} />
          </Form.Item>
          <Form.Item>
            <Button type="primary">Save</Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
