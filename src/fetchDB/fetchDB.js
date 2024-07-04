const fetchProfile = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      if (!data.household) {
        return 'You are not assigned to a household. Please create or join a household.';
      }
      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return 'Error fetching profile.';
    }
  };

  const fetchBalances = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/balances', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Fetched balances:', data);
      
      // Find the balance of the current user
      const currentUserBalance = data.find(user => user.username === localStorage.getItem('username'));
      if (currentUserBalance) {
        return currentUserBalance.balance;
      } else {
        console.error('User balance not found for username:', localStorage.getItem('username'));
      }
    } catch (error) {
      console.error('Error fetching balances:', error);
      return 'Error fetching balances.';
    }
  };