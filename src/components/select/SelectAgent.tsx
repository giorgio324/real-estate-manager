import { useFormikContext } from 'formik';
import { Agent } from '../../types/agent';
import LinkedSelect from './LinkedSelect';

type Props = {
  agents?: Agent[];
  error?: string;
  isLoading: boolean;
};

const SelectAgent = ({ agents, isLoading, error }: Props) => {
  const { setFieldValue } = useFormikContext();
  const handleAgentChange = (agent: Agent) => {
    setFieldValue('agent', agent);
    localStorage.setItem('agent', JSON.stringify(agent));
  };
  return (
    <div className='mt-[80px]'>
      <LinkedSelect<Agent>
        isLoading={isLoading}
        error={error}
        label='აირჩიე'
        placeholder='აირჩიე აგენტი'
        name='agent'
        options={agents}
        onChange={handleAgentChange}
      />
    </div>
  );
};

export default SelectAgent;
