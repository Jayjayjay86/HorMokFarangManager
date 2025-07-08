const BackupStatus = () => {
  const [lastBackupTime, setLastBackupTime] = useState('Never');
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backupStatus, setBackupStatus] = useState('');

  // Load last backup time from storage on component mount
  useEffect(() => {
    const loadLastBackupTime = async () => {
      const time = await Storage.getString('LAST_BACKUP_TIME');
      if (time) {
        setLastBackupTime(new Date(parseInt(time)).toLocaleString();
      }
    };
    loadLastBackupTime();
  }, []);

  const handleBackup = async () => {
    setIsBackingUp(true);
    setBackupStatus('Backing up...');
    
    try {
      // Get all data that needs to be backed up
      const recipe = Storage.getObject('RECIPE_DATA_KEY') || {};
      const inventory = Storage.getObject('INVENTORY_DATA_KEY') || {};
      const portions = Storage.getNumber('PORTION_DATA_KEY') || 0;
      
      const backupData = {
        recipe,
        inventory,
        portions,
        timestamp: Date.now()
      };

      // Send to backup endpoint
      const response = await fetch('http://0.0.0.0:3000/api/backup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backupData),
      });

      if (response.ok) {
        const now = Date.now();
        await Storage.setString('LAST_BACKUP_TIME', now.toString());
        setLastBackupTime(new Date(now).toLocaleString());
        setBackupStatus('Backup successful!');
      } else {
        throw new Error('Backup failed');
      }
    } catch (error) {
      console.error('Backup error:', error);
      setBackupStatus('Backup failed. Please try again.');
    } finally {
      setIsBackingUp(false);
      // Clear status message after 3 seconds
      setTimeout(() => setBackupStatus(''), 3000);
    }
  };

  return (
    <>
      <Text style={styles.sectionTitle}>Data Backup</Text>
      <View style={styles.calculatorContainer}>
        <Text style={styles.backupText}>
          Last backup: {lastBackupTime}
        </Text>
        
        <TouchableOpacity
          style={styles.calculateButtonContainer}
          onPress={handleBackup}
          disabled={isBackingUp}>
          <Text style={styles.calculateButtonText}>
            {isBackingUp ? 'Backing Up...' : 'Backup Now'}
          </Text>
        </TouchableOpacity>
        
        {backupStatus ? (
          <Text style={backupStatus.includes('failed') ? styles.backupError : styles.backupSuccess}>
            {backupStatus}
          </Text>
        ) : null}
      </View>
    </>
  );
};

export default BackupStatus;
