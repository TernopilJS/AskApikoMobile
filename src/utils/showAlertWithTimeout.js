import { Alert } from 'react-native';

const showAlertWithTimeout = ({
  title,
  subtitle,
  timeout,
}) => setTimeout(
  () => Alert.alert(title, subtitle),
  timeout,
);

export default showAlertWithTimeout;
