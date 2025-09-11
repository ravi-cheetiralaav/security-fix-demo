class FundTransfer:
    def __init__(self):
        self.balances = {}

    def transfer(self, sender, recipient, amount):
        if self.balances.get(sender, 0) >= amount:
            self.balances[sender] -= amount
            self.balances[recipient] = self.balances.get(recipient, 0) + amount
            return True
        else:
            return False

