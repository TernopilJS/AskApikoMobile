import moment from 'moment';
import { colors } from '../styles';
import i18n from '../i18n';
import { jobConstants, momentFormats } from '../constants';


const statusHelper = (props) => {
  const params = {
    text: i18n.t('main.appliedJob.statuses.applied'),
    color: colors.applyStatuses.applied,
    string: '',
  };

  const shouldShowApplied =
    !props.viewedTimeStamp && (
      jobConstants.applyStatuses.pending === props.status ||
      jobConstants.applyStatuses.applied === props.status
    );
  const shouldShowViewed =
    props.viewedTimeStamp && (
      jobConstants.applyStatuses.applied === props.status
    );

  if (shouldShowApplied) {
    params.text = i18n.t('main.appliedJob.statuses.applied');
    params.color = colors.applyStatuses.applied;
  } else if (shouldShowViewed) {
    params.text = i18n.t('main.appliedJob.statuses.viewed');
    params.color = colors.applyStatuses.viewed;
  } else {
    params.text = i18n.t('main.appliedJob.statuses.noLongerAvailable');
    params.color = colors.applyStatuses.noLongerAvailable;
  }


  // else if (jobConstants.applyStatuses.applied === props.status) {
  //   params.text = i18n.t('main.appliedJob.statuses.applied');
  //   params.color = colors.applyStatuses.applied;
  // } else if (jobConstants.applyStatuses.notInterested === props.status) {
  //   params.text = i18n.t('main.appliedJob.statuses.notInterested');
  //   params.color = colors.applyStatuses.notInterested;
  // } else if (jobConstants.applyStatuses.notQualified === props.status) {
  //   params.text = i18n.t('main.appliedJob.statuses.notQualified');
  //   params.color = colors.applyStatuses.notQualified;
  //   params.allowDelete = true;
  // }

  const date = '';
  // Uncomment that to show status change date
  // const date = props.createdDate && !params.allowDelete
  //   ? ` ${moment(props.createdDate).format(momentFormats.appliedJobDate)}`
  // : '';

  params.string = `${params.text} ${date}`;

  return params;
};


export default statusHelper;
